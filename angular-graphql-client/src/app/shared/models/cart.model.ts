import { MailingAddress } from './mailingAddress.model';
import { LineItem } from './lineItem.model';

export const enum CheckoutStatus {
    create,
    update,
}

export class Cart {
    id = '';
    email = '';
    lineItemsGl: LineItem[] = [];
    shippingAddress: MailingAddress = new MailingAddress;
    allowPartialAddresses = false;
    status: CheckoutStatus = CheckoutStatus.create;
}