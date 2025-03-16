/**
 * Creator 클래스는 Product 클래스의 객체를 반환하는 팩토리 메서드를 선언합니다.
 * Creator의 하위 클래스들이 일반적으로 이 메서드의 구현을 제공합니다.
 */
abstract class Creator {
  /**
   * Creator는 팩토리 메서드의 기본 구현을 제공할 수도 있습니다.
   */
  public abstract factoryMethod(): Product;

  /**
   * Creator의 주요 책임이 제품을 생성하는 것이 아님에 주목하세요.
   * 일반적으로 팩토리 메서드에 의해 반환된 Product 객체에 의존하는 핵심 비즈니스 로직을 포함합니다.
   * 하위 클래스들은 팩토리 메서드를 오버라이드하고 다른 유형의 제품을 반환함으로써
   * 간접적으로 이 비즈니스 로직을 변경할 수 있습니다.
   */
  public someOperation(): string {
      // 팩토리 메서드를 호출하여 Product 객체를 생성합니다.
      const product = this.factoryMethod();
      // 이제 제품을 사용합니다.
      return `Creator: 동일한 creator의 코드가 ${product.operation()}와 함께 작동했습니다`;
  }
}
/**
 * 1. Creator (추상 클래스)
 * 객체 생성을 위한 팩토리 메서드(factoryMethod) 선언
 * 핵심 비즈니스 로직(someOperation) 포함
 * 실제 생성할 객체의 타입은 서브클래스에서 결정
 */

/**
* Concrete Creators는 팩토리 메서드를 오버라이드하여 
* 결과 제품의 타입을 변경합니다.
*/
class ConcreteCreator1 extends Creator {
  /**
   * 메서드의 시그니처가 여전히 추상 제품 타입을 사용하고 있음에 주목하세요.
   * 실제로는 구체적인 제품이 메서드에서 반환되지만,
   * 이렇게 함으로써 Creator는 구체적인 제품 클래스들로부터 독립적일 수 있습니다.
   */
  public factoryMethod(): Product {
      return new ConcreteProduct1();
  }
}

class ConcreteCreator2 extends Creator {
  public factoryMethod(): Product {
      return new ConcreteProduct2();
  }
}
/**
 * 2. ConcreteCreator (구체적인 생성자 클래스)
 * 팩토리 메서드를 오버라이딩하여 구체적인 제품 객체 반환
 */

/**
* Product 인터페이스는 모든 구체적인 제품들이 구현해야 하는
* 작업들을 선언합니다.
*/
interface Product {
  operation(): string;
}
/**
 * 3. Product (추상 제품 인터페이스)
 * 모든 구체적 제품들이 공통적으로 구현해야 할 인터페이스 정의
 */

/**
* Concrete Products는 Product 인터페이스의 다양한 구현을 제공합니다.
*/
class ConcreteProduct1 implements Product {
  public operation(): string {
      return '{ConcreteProduct1의 결과}';
  }
}

class ConcreteProduct2 implements Product {
  public operation(): string {
      return '{ConcreteProduct2의 결과}';
  }
}
/**
 * 4. ConcreteProduct (구체적인 제품 클래스)
 * 실제 비즈니스 로직을 구현한 클래스들
 */

/**
* 클라이언트 코드는 기본 인터페이스를 통해 구체적인 creator의 인스턴스와 
* 작동합니다. 클라이언트가 기본 인터페이스를 통해 creator와 계속 작업하는 한,
* 어떤 creator의 하위 클래스도 전달할 수 있습니다.
*/
function clientCode(creator: Creator) {
  // ...
  console.log('클라이언트: creator의 클래스를 모르지만, 여전히 작동합니다.');
  console.log(creator.someOperation());
  // ...
}

/**
* 애플리케이션은 설정이나 환경에 따라 creator의 타입을 선택합니다.
*/
// console.log('앱: ConcreteCreator1으로 실행되었습니다.');
// const concreteCreator1 = new ConcreteCreator1();
// const product1 = concreteCreator1.factoryMethod();
// clientCode(concreteCreator1);
// console.log('');

// console.log('앱: ConcreteCreator2로 실행되었습니다.');
// const concreteCreator2 = new ConcreteCreator2();
// const product2 = concreteCreator2.factoryMethod();
// clientCode(concreteCreator2);
// console.log('');

// console.log({ concreteCreator1, concreteCreator2, product1, product2 })
