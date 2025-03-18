/**
 * 추상 팩토리 패턴
 * 이 코드는 운영 체제(Windows와 Mac)에 따라 버튼과 체크박스를 생성하는 추상 팩토리 패턴의 구조를 보여줌
 */

/**
 * 1. Abstract Factory (추상 팩토리) - 추상 팩토리 인터페이스
 * 운영 체제별로 버튼과 체크박스를 생성하는 팩토리를 정의
 * 
 * 추상 팩토리 인터페이스는 다른 추상 제품들을 반환하는 메서드들의 집합을 선언한다.
 * 이러한 제품들을 패밀리라고 하며 이들은 상위 수준의 주제 또는 개념으로 연결된다.
 * 한 가족의 제품들은 일반적으로 서로 협력할 수 있다.
 * 제품들의 패밀리(제품군)에는 여러 변형이 있을 수 있지만 한 변형의 제품들은 다른 변형의 제품들과 호환되지 않는다.
 */
/**

 */
interface GUIFactory { 
  createButton(): Button;
  createCheckbox(): Checkbox;
}

/**
 *  2. Concrete Factory (구체적인 팩토리)
 * 운영 체제별로 버튼과 체크박스를 생성하는 팩토리를 구현
 * 
 * 구상 팩토리들은 단일 변형에 속하는 제품들의 패밀리(제품군)을 생성한다.
 * 이 팩토리는 결과 제품들의 호환을 보장한다. 
 * 구상 팩토리 메서드의 시그니처들은 추상 제품을 반환하는 반면, 메서드 내부에서는 구상 제품이 인스턴스화된다.
 */
// 맥용 GUI 팩토리 
// 각 구상 팩토리에는 해당하는 제품 변형이 있다.
class MacFactory implements GUIFactory {
  public createButton(): Button {
    return new MacButton();
  }

  public createCheckbox(): Checkbox {
    return new MacCheckbox();
  }
}

// 윈도우용 GUI 팩토리 
class WindowsFactory implements GUIFactory {
  public createButton(): Button {
    return new WindowsButton();
  }

  public createCheckbox(): Checkbox {
    return new WindowsCheckbox();
  }
}

/**
 *  3. Abstract Product (추상 제품)
 * 버튼과 체크박스의 공통 인터페이스를 정의
 * 
 * 제품 패밀리의 각 개별 제품에는 기초 인터페이스가 있어야 한다.
 * 이 제품의 모든 변형은 이 인터페이스를 구현해야 한다.
 */
// 버튼 인터페이스
interface Button {
  render(): void;
}

// 체크박스 인터페이스
interface Checkbox {
  render(): void;
}

/**
 * 4. Concrete Product (구체적인 제품)
 * 운영 체제별로 버튼과 체크박스를 구현
 */
// 맥용 버튼
// 구상 제품들은 해당하는 구상 팩토리에서 생성됩니다.
class MacButton implements Button {
  public render(): void {
    console.log("맥 스타일 버튼을 렌더링합니다.");
  }
}

// 윈도우용 버튼
class WindowsButton implements Button {
  public render(): void {
    console.log("윈도우 스타일 버튼을 렌더링합니다.");
  }
}

class MacCheckbox implements Checkbox {
  public render(): void {
    console.log("맥 스타일 체크박스를 렌더링합니다.");
  }
}

// 윈도우용 체크박스
class WindowsCheckbox implements Checkbox {
  public render(): void {
    console.log("윈도우 스타일 체크박스를 렌더링합니다.");
  }
}

// 맥용 체크박스


/**
 * 5. Client Code (클라이언트 코드)
 * 클라이언트는 추상 팩토리를 통해 제품을 생성하고 사용한다. 클라이언트는 구체적인 팩토리에 대해 알 필요가 없.
 */
function clientCode(factory: GUIFactory) {
  const button = factory.createButton();
  const checkbox = factory.createCheckbox();

  button.render();
  checkbox.render();
}

/**
 * 실행 코드
 */
console.log("\n앱: 맥 팩토리로 실행합니다.");
const macFactory = new MacFactory();
clientCode(macFactory);

console.log("앱: 윈도우 팩토리로 실행합니다.");
const windowsFactory = new WindowsFactory();
clientCode(windowsFactory);

/**
 * 역할	설명	예시
Abstract Factory	제품군 생성 메서드를 정의	GUIFactory
Concrete Factory	특정 제품군을 생성	WindowsFactory, MacFactory
Abstract Product	제품의 공통 인터페이스를 정의	Button, Checkbox
Concrete Product	구체적인 제품을 구현	WindowsButton, MacButton, WindowsCheckbox, MacCheckbox
Client Code	추상 팩토리를 통해 제품 사용	clientCode(factory)
 */

/**
 * 이 예시는 추상 팩토리 패턴의 구조를 직관적으로 보여줍니다:

WindowsFactory와 MacFactory는 각 운영 체제에 맞는 버튼과 체크박스를 생성하며, 클라이언트는 구체적인 클래스에 의존하지 않습니다.

새로운 운영 체제(Linux 등)를 추가하려면 새로운 팩토리와 제품 클래스를 구현하기만 하면 됩니다.

혹시 더 궁금한 점 있으시면 말씀해주세요! 😊
 */