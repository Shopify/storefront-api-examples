import { Variant } from './variant.model';
import { Image } from './image.model';

export class Product{
    id: string;
    title: string;
    createdAt: Date;
    description: string='';
    descriptionPlainSummary: string;
    handle: string;
    productType: string;
    publishedAt: Date;
    tags: string;
    updatedAt: Date;
    variants: Variant[];
    vendor: string;
    images: Image[];
}