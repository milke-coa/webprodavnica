export const StorageConfig = {
    
   // photosDestination: '../storage/photos/',
   // photosMaxFileSize: 1024*1024*3, //u bajtovima izrazeno
   // photoTumbSize: {width: 120, height:100},
   // potoSmallImage:{width: 320, height:240},
   //refaktorisan kod
    photo:{
        destination:'../storage/photos/',
        maxSize: 3 * 1024 *1024, // 3MB u bajtovima
        resize:{
            thumb:{
                width: 120,
                height:100,
                directory: 'thumb/'
            },
            small:{
                width: 320,
                height:240,
                directory: 'small/'
            },

        }
    }
    
}