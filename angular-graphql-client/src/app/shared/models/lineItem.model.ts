import { Variant } from './variant.model';

export class LineItem{
    id: string = '';
    title: string = '';
    quantity: number = 0;
    variant: Variant = new Variant;
}