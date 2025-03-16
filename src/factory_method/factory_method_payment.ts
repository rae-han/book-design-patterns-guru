// Creator (결제 처리 흐름)
abstract class PaymentProcessor {
  public abstract createPaymentMethod(): PaymentMethod;

  // 핵심 비즈니스 로직 (공통 흐름)
  public processPayment(amount: number): void {
    const method = this.createPaymentMethod();
    method.pay(amount); // 실제 결제 처리는 PaymentMethod에게 위임
  }
}

// ConcreteCreator (구체적인 결제 방식 선택)
class CreditCardProcessor extends PaymentProcessor {
  public createPaymentMethod(): PaymentMethod {
    return new CreditCardPayment();
  }
}

class PayPalProcessor extends PaymentProcessor {
  public createPaymentMethod(): PaymentMethod {
    return new PayPalPayment();
  }
}

// Product 인터페이스 (결제 방법)
interface PaymentMethod {
  pay(amount: number): void;
}

// ConcreteProduct (실제 결제 방법 구현)
class CreditCardPayment implements PaymentMethod {
  pay(amount: number): void {
    console.log(`신용카드로 ${amount}원을 결제했습니다.`);
    // 여기에 실제 신용카드 결제 처리 코드가 들어갑니다.
  }
}

class PayPalPayment implements PaymentMethod {
  pay(amount: number): void {
    console.log(`페이팔로 ${amount}원을 결제했습니다.`);
    // 여기에 실제 페이팔 결제 처리 코드가 들어갑니다.
  }
}

// 클라이언트 코드
const processor = new CreditCardProcessor();
processor.processPayment(10000); // 신용카드로 결제

const processor2 = new PayPalProcessor();
processor2.processPayment(20000); // 페이팔로 결제
// 여기서는:

// **Creator (PaymentProcessor)**가 전체 흐름(핵심 비즈니스 로직)을 담당하고,
//**Product (CreditCardPayment, PayPalPayment)**가 실제 작업(실제 비즈니스 로직)을 담당합니다.

function clientPaymentCode(processor: PaymentProcessor, amount: number) {
  console.log('클라이언트: 프로세서의 구체적인 클래스를 모르지만, 여전히 작동합니다.');
  processor.processPayment(amount);
}

console.log('앱: CreditCardProcessor로 실행되었습니다.');
const creditCardProcessor = new CreditCardProcessor();
clientPaymentCode(creditCardProcessor, 10000);
console.log('');

console.log('앱: PayPalProcessor로 실행되었습니다.');
const payPalProcessor = new PayPalProcessor();
clientPaymentCode(payPalProcessor, 20000);
console.log('');

console.log({ creditCardProcessor, payPalProcessor });