abstract class Creator {
  public abstract factoryMethod(): Product;

  public processProduct(): string {
    const product = this.factoryMethod();

    return `핵심 비즈니스 로직의 결과인 ${product.operation()}`;
  }
}

class ConcreteCreator1 extends Creator {
  public factoryMethod(): Product {
    return new ConcreteProduct1();
  }
}

class ConcreteCreator2 extends Creator {
  public factoryMethod(): Product {
    return new ConcreteProduct2();
  }
}

interface Product {
  operation(): string;
}

class ConcreteProduct1 implements Product {
  public operation(): string {
    return '[ConcreteProduct1] 의 실제 비즈니스 로직'
  }
}

class ConcreteProduct2 implements Product {
  public operation(): string {
    return '[ConcreteProduct2] 의 실제 비즈니스 로직'
  }
}

const clientCode = (creator: Creator) => {
  console.log(creator.processProduct());
}

clientCode(new ConcreteCreator1());
clientCode(new ConcreteCreator2());