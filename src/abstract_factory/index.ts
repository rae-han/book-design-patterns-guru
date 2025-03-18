/**
 * 추상 팩토리 인터페이스는 서로 다른 추상 제품을 반환하는 메서드 집합을 선언합니다.
 * 이러한 제품들은 '제품군'이라고 불리며 상위 수준의 테마나 개념으로 연관되어 있습니다.
 * 한 제품군의 제품들은 일반적으로 서로 협력할 수 있습니다. 제품군은 여러 변형을 가질 수 있지만,
 * 한 변형의 제품은 다른 변형의 제품과 호환되지 않습니다.
 */
interface AbstractFactory {
  createProductA(): AbstractProductA;

  createProductB(): AbstractProductB;
}

/**
* 구체적인 팩토리는 단일 변형에 속하는 제품군을 생산합니다.
* 팩토리는 생성된 제품들이 서로 호환되도록 보장합니다.
* 구체적인 팩토리의 메서드 시그니처는 추상 제품을 반환하지만,
* 메서드 내부에서는 구체적인 제품이 인스턴스화됩니다.
*/
class ConcreteFactory1 implements AbstractFactory {
  public createProductA(): AbstractProductA {
      return new ConcreteProductA1();
  }

  public createProductB(): AbstractProductB {
      return new ConcreteProductB1();
  }
}

/**
* 각 구체적인 팩토리는 해당하는 제품 변형을 가집니다.
*/
class ConcreteFactory2 implements AbstractFactory {
  public createProductA(): AbstractProductA {
      return new ConcreteProductA2();
  }

  public createProductB(): AbstractProductB {
      return new ConcreteProductB2();
  }
}

/**
* 제품군의 각 고유한 제품은 기본 인터페이스를 가져야 합니다.
* 제품의 모든 변형은 이 인터페이스를 구현해야 합니다.
*/
interface AbstractProductA {
  usefulFunctionA(): string;
}

/**
* 이러한 구체적인 제품들은 해당하는 구체적인 팩토리에 의해 생성됩니다.
*/
class ConcreteProductA1 implements AbstractProductA {
  public usefulFunctionA(): string {
      return '제품 A1의 결과입니다.';
  }
}

class ConcreteProductA2 implements AbstractProductA {
  public usefulFunctionA(): string {
      return '제품 A2의 결과입니다.';
  }
}

/**
* 여기에 다른 제품의 기본 인터페이스가 있습니다. 모든 제품은 서로 상호작용할 수 있지만,
* 적절한 상호작용은 동일한 구체적인 변형의 제품 간에만 가능합니다.
*/
interface AbstractProductB {
  /**
   * 제품 B는 자체적인 기능을 수행할 수 있습니다...
   */
  usefulFunctionB(): string;

  /**
   * ...하지만 제품 A와도 협력할 수 있습니다.
   *
   * 추상 팩토리는 생성하는 모든 제품이 동일한 변형이므로
   * 서로 호환되도록 보장합니다.
   */
  anotherUsefulFunctionB(collaborator: AbstractProductA): string;
}

/**
* 이러한 구체적인 제품들은 해당하는 구체적인 팩토리에 의해 생성됩니다.
*/
class ConcreteProductB1 implements AbstractProductB {

  public usefulFunctionB(): string {
      return '제품 B1의 결과입니다.';
  }

  /**
   * 변형 제품 B1은 변형 제품 A1과만 올바르게 작동할 수 있습니다.
   * 그럼에도 불구하고 AbstractProductA의 모든 인스턴스를 인자로 받습니다.
   */
  public anotherUsefulFunctionB(collaborator: AbstractProductA): string {
      const result = collaborator.usefulFunctionA();
      return `B1이 (${result})와 협력한 결과`;
  }
}

class ConcreteProductB2 implements AbstractProductB {

  public usefulFunctionB(): string {
      return '제품 B2의 결과입니다.';
  }

  /**
   * 변형 제품 B2는 변형 제품 A2와만 올바르게 작동할 수 있습니다.
   * 그럼에도 불구하고 AbstractProductA의 모든 인스턴스를 인자로 받습니다.
   */
  public anotherUsefulFunctionB(collaborator: AbstractProductA): string {
      const result = collaborator.usefulFunctionA();
      return `B2가 (${result})와 협력한 결과`;
  }
}

/**
* 클라이언트 코드는 추상 타입인 AbstractFactory와 AbstractProduct를 통해서만
* 팩토리와 제품을 다룹니다. 이를 통해 클라이언트 코드를 변경하지 않고도
* 어떤 팩토리나 제품 서브클래스도 클라이언트 코드에 전달할 수 있습니다.
*/
function clientCode(factory: AbstractFactory) {
  const productA = factory.createProductA();
  const productB = factory.createProductB();

  console.log(productB.usefulFunctionB());
  console.log(productB.anotherUsefulFunctionB(productA));
}

/**
* 클라이언트 코드는 어떤 구체적인 팩토리 클래스와도 작동할 수 있습니다.
*/
console.log('클라이언트: 첫 번째 팩토리 타입으로 클라이언트 코드 테스트 중...');
clientCode(new ConcreteFactory1());

console.log('');

console.log('클라이언트: 두 번째 팩토리 타입으로 동일한 클라이언트 코드 테스트 중...');
clientCode(new ConcreteFactory2());