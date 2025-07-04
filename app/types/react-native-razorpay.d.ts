declare module 'react-native-razorpay' {
    interface RazorpayOptions {
      description: string;
      image: string;
      currency: string;
      key: string;
      amount: number;
      name: string;
      order_id: string;
      prefill: {
        email: string;
        contact: string;
        name: string;
      };
      theme?: {
        color?: string;
      };
    }
  
    interface RazorpaySuccessResponse {
      razorpay_order_id: string;
      razorpay_payment_id: string;
      razorpay_signature: string;
    }
  
    interface RazorpayErrorResponse {
      code: number;
      description: string;
      error: {
        code: string;
        description: string;
        field: string;
        source: string;
        step: string;
        reason: string;
        metadata: any;
      };
    }
  
    const RazorpayCheckout: {
      open(options: RazorpayOptions): Promise<RazorpaySuccessResponse>;
    };
  
    export default RazorpayCheckout;
  }
  