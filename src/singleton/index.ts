import objectA from "./imports/object-a.js";
import objectB from "./imports/object-b.js";

class Singleton {
  private static instance: Singleton;
  private constructor() {} // private constructor

  public static getInstance(): Singleton {
      if (!Singleton.instance) {
          Singleton.instance = new Singleton();
      }
      return Singleton.instance;
  }

  // 비즈니스 로직 메서드
  public doSomething() {
      console.log("Singleton instance is doing something.");
  }
}

// 사용 예시
const singleton1 = Singleton.getInstance();
const singleton2 = Singleton.getInstance();

console.log(singleton1 === singleton2); // true

console.log(objectA === objectB);
