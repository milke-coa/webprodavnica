/* eslint-disable @typescript-eslint/no-unused-vars */
import { JoinTable } from "typeorm";
import { ManyToMany } from "typeorm";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Article } from "./Article";
import { ArticleFeature } from "./ArticleFeature";
import { Category } from "./Category";

@Index("uq_feature_name_category_id", ["name", "categoryId"], { unique: true })
@Index("fk_feature_category_id", ["categoryId"], {})
@Entity("feature", { schema: "aplikacija" })
export class Feature {
  @PrimaryGeneratedColumn({ type: "int", name: "feature_id", unsigned: true })
  featureId: number;

  @Column("varchar", { name: "name", length: 32, default: () => "'0'" })
  name: string;

  @Column("int", { name: "category_id", unsigned: true, default: () => "'0'" })
  categoryId: number;

  @OneToMany(
    () => ArticleFeature,
    (articleFeature) => articleFeature.feature
  )
  articleFeatures: ArticleFeature[];

  @ManyToMany(type => Article, article => article.features)
  @JoinTable({
    name: "article_feature",
    joinColumn: { name: "feature_id", referencedColumnName: "featureId"},
    inverseJoinColumn: { name: "article_id", referencedColumnName: "articleId"}
  })
  articles: Article[];

  @ManyToOne(() => Category, (category) => category.features, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "category_id", referencedColumnName: "categoryId" }])
  category: Category;
}
