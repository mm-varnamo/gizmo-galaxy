export interface OrderItem {
	_id: string;
	name: string;
	qty: number;
	image: string;
	price: number;
	product: string;
	totalPrice: number;
	isPaid: boolean;
	paidAt: string;
	isDelivered: boolean;
	deliveredAt: string;
	createdAt: string;
	user: {
		_id: string;
		name: string;
	};
}
