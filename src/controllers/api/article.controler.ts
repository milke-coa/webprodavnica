/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Param, Post, Req, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Crud } from "@nestjsx/crud";
import { StorageConfig } from "config/storage.config";
import { Article } from "src/entities/Article";
import { AddArticleDto } from "src/dtos/article/add.article.dto";
import { ArticleServices } from "src/services/article/article.service";
import {diskStorage} from "multer";
import { Photo } from "src/entities/Photo";
import { PhotoServices } from "src/services/photo/photo.services";
import { ApiResponse } from "src/misc/api.response.class";
import { UploadedFile } from "@nestjs/common";
import * as fileType from 'file-type';
import * as fs from 'fs';
import * as sharp from 'sharp';
import { Delete } from "@nestjs/common";


@Controller('api/article')
@Crud({
    model: {
        type: Article
    },
    params:{
        id: {
            field: 'articleId',
            type: 'number',
            primary: true
        }
    },
    query:{
        join:{  
             category:{ eager:true
                },
             photos:{eager:true
                 },
             articlePrices:{ eager:true
                },

             articleFeature:{ eager:true
                },
                features:{ eager:true
                }

            }
        }  
})

export class ArticleControler{
    constructor( public service: ArticleServices,
                 public photoService: PhotoServices
        ) { } 

    @Post('creteFull')
    creteFullArticle(@Body() data:AddArticleDto){
        return this.service.creteFullArticle(data);
    }

    @Post(':id/uploadPhoto/') // POST http://
    @UseInterceptors (
        FileInterceptor('photo',{
           // dest: StorageConfig.photos najednostavni mehanizam samo se da putanja
          
           storage:diskStorage({
             destination: StorageConfig.photo.destination,
             filename:(req, file, callback)=> {
                // dobijamo: 'neka slika.jpg
                //zelimo 02-02-2021-639833033-neka-slika.jpg
                let original: string = file.originalname;

                let normalized: string  = original.replace(/\s+/g, '-'); //regularni izraz
                normalized = normalized.replace(/[^A-z0-9\.\-]/g, ' ');// cemu sluzi
                
                let sada = new Date();
                let datePart: string = ' ';
                datePart += sada.getFullYear().toString();
                datePart += (sada.getMonth()+1).toString();
                datePart += sada.getDate().toString();

                 let randomPart: string = new Array(10).fill(0)
                .map(e => (Math.random() * 9).toFixed(0).toString())
                .join('');

               let fileName = datePart + '-'+randomPart + '-'+ normalized;
               fileName = fileName.toLowerCase();

               callback(null, fileName);
            
            }
           }),
           fileFilter:(req,file,callback)=>{
               //provera ekstenzije
               if(!file.originalname.toLowerCase().match(/\.(jpg|png)$/)) {
                   req.fileError = 'Bad file extension';
                   callback(null,false);
                   return;
               }

               if (!(file.mimetype.includes('jpeg')||file.mimetype.includes('png'))){
                    req.fileError = 'Bad file content';
                   callback(null,false);
                   return;
               }

               callback(null, true);
           },
           limits: {
            files: 1,
            fileSize: StorageConfig.photo.maxSize,
           },
           
        })
    )
    async uploadPhoto(@Param('id')articleId: number,
         @UploadedFile() photo, 
         @Req()req ): Promise<ApiResponse | Photo> {
       
            // let imagePath = photo.filename; // zapis u bazu podataka
            console.log(req.fileError)
            console.log(photo); 
        


       if(req.fileError){
        return new ApiResponse('errore', -4001, req.fileError);

       }
       if(!photo){
        return new ApiResponse('errore', -4002, 'File not uploaded!');
       }
       const fileTypeResult = await fileType.fromFile(photo.path);
       if(!fileTypeResult){
           fs.unlinkSync(photo.path)//obriso taj fajl
           return  new ApiResponse('error',-4002,'Canot detect file');
       }
       const realMimeType = fileTypeResult.mime;
       if (!(realMimeType.includes('jpeg')||realMimeType.includes('png'))){
            fs.unlinkSync(photo.path)//obriso taj fajl
            return  new ApiResponse('error',-4002,'Bad content file');
       }

       await this.createResizedImage(photo,StorageConfig.photo.resize.thumb.directory);
       await this.createResizedImage(photo,StorageConfig.photo.resize.small.directory);

       const newPhoto: Photo = new Photo();
       newPhoto.articleId = articleId;
       newPhoto.imagePath = photo.filename;

       const  savedPhoto = await this.photoService.add(newPhoto);
       if(!savedPhoto){
           return new ApiResponse('errore', -4001);
       }
       return savedPhoto;
  }

async createResizedImage(photo, resizeSetings){
   
    const orgainalFilePath = photo.path;
    const fileName = photo.filename;

    const destinationFilePath = StorageConfig.photo.destination+
                                resizeSetings+fileName;

    await sharp(orgainalFilePath)
    .resize({
        fit: 'cover',
        width: resizeSetings.width,
        height: resizeSetings.height,
        background:{
            r:255, g:255, b:255, alpha:0.0
        }
    })
    .toFile(destinationFilePath);


    }
    //http://localhost:3000/api/1/deletePhoto/45
    @Delete(':articleId/deletePhoto/:photoId')
    public async deletePhoto(
        @Param('articleId') articleId: number,
        @Param('photoId') photoId: number){
            const photo = await this.photoService.findOne({
                articleId:articleId,
                photoId:photoId
            });
            if(!photo){
                return new ApiResponse('errore', -4004, 'Photo not found');
            }
            try{
            fs.unlinkSync(StorageConfig.photo.destination + photo.imagePath);
            fs.unlinkSync(StorageConfig.photo.destination+StorageConfig.photo.resize.thumb.directory + photo.imagePath);
            fs.unlinkSync(StorageConfig.photo.destination+StorageConfig.photo.resize.small.directory + photo.imagePath);
            } catch(e){ }

           const deletResult = await this.photoService.deleteById(photoId);
            if(deletResult.affected ===0){
                return new ApiResponse('error',-4004,'Photo not found' )
            }
            return new ApiResponse('ok',0,'One photo deleted' )

        }
}