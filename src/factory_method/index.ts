/**
 * Creator(생성자) 클래스는 Product 클래스의 객체를 반환하는 팩토리 메서드를 선언합니다.
 * Creator의 하위 클래스들이 이 메서드의 실제 구현을 담당합니다.
 */
abstract class Creator {
    /**
     * 팩토리 메서드를 추상 메서드로 선언합니다.
     * 각 하위 클래스에서 이를 구현하게 됩니다.
     */
    public abstract factoryMethod(): Product;

    /**
     * Creator 클래스의 주요 역할은 실제로 제품을 만드는 것이 아닙니다.
     * 대신 팩토리 메서드를 통해 반환된 Product 객체들을 사용하는
     * 핵심 비즈니스 로직을 포함합니다.
     * 
     * 하위 클래스들은 팩토리 메서드를 오버라이드하여 다른 종류의 제품을
     * 반환함으로써 이 비즈니스 로직을 간접적으로 변경할 수 있습니다.
     */
    public someOperation(): string {
        // 팩토리 메서드를 호출하여 Product 객체를 생성
        const product = this.factoryMethod();
        // 생성된 제품 사용
        return `생성자: 동일한 생성자의 코드가 ${product.operation()} 와 함께 작동했습니다`;
    }
}

/**
 * 구체적인 생성자들은 팩토리 메서드를 오버라이드하여
 * 서로 다른 종류의 제품을 반환합니다.
 */
class ConcreteCreator1 extends Creator {
    /**
     * 참고: 메서드의 시그니처는 여전히 추상 Product 타입을 사용하지만,
     * 실제로는 구체적인 제품을 반환합니다.
     * 이를 통해 Creator는 구체적인 제품 클래스들로부터 독립적일 수 있습니다.
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
 * Product 인터페이스는 모든 구체적인 제품들이
 * 구현해야 하는 작업들을 선언합니다.
 */
interface Product {
    operation(): string;
}

/**
 * 구체적인 제품들은 Product 인터페이스의
 * 다양한 구현을 제공합니다.
 */
class ConcreteProduct1 implements Product {
    public operation(): string {
        return '{구체적인 제품1의 결과}';
    }
}

class ConcreteProduct2 implements Product {
    public operation(): string {
        return '{구체적인 제품2의 결과}';
    }
}

/**
 * 클라이언트 코드는 구체적인 생성자의 인스턴스와 작동하지만,
 * 기본 인터페이스를 통해 작업합니다.
 * 클라이언트가 기본 인터페이스를 통해 생성자와 계속 작업하는 한,
 * 어떤 생성자의 하위 클래스도 전달할 수 있습니다.
 */
function clientCode(creator: Creator) {
    console.log('클라이언트: 생성자의 클래스를 모르지만, 여전히 작동합니다.');
    console.log(creator.someOperation());
}

/**
 * 애플리케이션은 설정이나 환경에 따라
 * 생성자의 타입을 선택합니다.
 */
console.log('앱: ConcreteCreator1으로 시작합니다.');
clientCode(new ConcreteCreator1());
console.log('');

console.log('앱: ConcreteCreator2로 시작합니다.');
clientCode(new ConcreteCreator2());