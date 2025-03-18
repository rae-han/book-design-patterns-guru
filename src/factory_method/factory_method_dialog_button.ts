/**
 * 팩토리 메서드 패턴
 * - 윈도우와 맥 버튼 예시
 * - 운영 체제에 따라 버튼을 생성하는 방식으로 팩토리 메서드 패턴의 핵심 개념을 쉽게 이해할 수 있도록 구성
 */

/**
 * 1. Creator (추상 클래스) - 추상 Creator
 * Creator는 팩토리 메서드를 선언하고, 이를 통해 제품(Button)을 생성
 * 구체적인 버튼 생성은 하위 클래스에서 구현
 */
abstract class Dialog {
  public abstract createButton(): Button;

  public render() {
    const button = this.createButton();

    return `이 Dialog의 버튼은 ${button.render()} 입니다.`
  }
}

/**
 * 2. ConcreteCreator (구체적인 생성자 클래스) - 구체 Creator
 * 운영 체제별로 버튼을 생성하는 팩토리를 구현
 */
class WindowsDialog extends Dialog {
  public createButton(): Button {
    return new WindowsButton();
  }
}

class MacDialog extends Dialog {
  public createButton(): Button {
    return new MacButton();
  }
}

/**
 * 3. Product (추상 제품 인터페이스 or 클래스) - 추상 Product
 * 버튼의 공통 인터페이스를 정의
 */
interface Button {
  render(): string
}

/**
 * 4. ConcreteProduct (구체적인 제품 클래스) - 구체 Product
 * 운영 체제별로 버튼을 구현
 */
class WindowsButton implements Button {
  public render() {
    return '[Windows Button]'
  }
}

class MacButton implements Button {
  public render() {
    return '[Mac Button]'
  }
}

/**
 * 5. Client (클라이언트 코드) - 클라이언트 코드
 * 팩토리 메서드를 사용하여 제품을 생성
 * 클라이언트는 추상 클래스(Dialog)를 통해 제품(Button)을 사용하며, 구체적인 팩토리에 대해 알 필요가 없음.
 */
const clientCode = (dialog: Dialog) => {
  const renderedDialog = dialog.render();
  console.log(renderedDialog);
}

const windowsDialog = new WindowsDialog();
clientCode(windowsDialog)

const macDialog = new MacDialog();
clientCode(macDialog);

/**
 * 역할	             설명	                                     예시
 * Creator	        팩토리 메서드를 선언하고 공통 비즈니스 로직을 처리	 Dialog
 * ConcreteCreator	구체적인 제품을 생성하는 팩토리를 구현	          WindowsDialog, MacDialog
 * Product	        제품의 공통 인터페이스를 정의	                  Button
 * ConcreteProduct	구체적인 제품을 구현	                        WindowsButton, MacButton
 * Client Code	    추상 클래스(Dialog)를 통해 제품 사용	          clientCode(dialog)
 */

/**
 * 팩토리 메서드 패턴의 특징
유연성: 클라이언트는 구체적인 제품이나 팩토리에 의존하지 않고 추상 인터페이스를 통해 작업합니다.

확장성: 새로운 운영 체제(예: Linux)를 추가하려면 새로운 팩토리와 제품 클래스를 추가하기만 하면 됩니다.

책임 분리: 객체 생성 로직은 팩토리에 캡슐화되고, 클라이언트는 생성된 객체를 사용하는 데만 집중합니다.

이 예시는 윈도우와 맥 버튼이라는 친숙한 개념으로 팩토리 메서드 패턴을 설명하므로 이해하기 쉽습니다. 😊
혹시 더 궁금한 점 있으시면 말씀해주세요!
 */