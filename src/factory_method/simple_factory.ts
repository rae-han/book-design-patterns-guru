class IOSButton { }

class AndroidButton { }

const OS = {
  IOS: 'ios',
  ANDROID: 'android',
} as const

type OS = typeof OS[keyof typeof OS]

const isIOS = (os: OS) => os === OS.IOS;

// Without Factory
const button1_1 = isIOS(OS.IOS) ? new IOSButton() : new AndroidButton()
const button1_2 = isIOS(OS.ANDROID) ? new IOSButton() : new AndroidButton()

console.log({ button1_1, button1_2 })

class ButtonFactory {
  createButton(os: OS): IOSButton | AndroidButton {
    switch (os) {
      case OS.IOS:
        return new IOSButton();
      case OS.ANDROID:
        return new AndroidButton();
      default:
        throw new Error('Invalid OS');
    }
  }
}

// With Factory
const factory = new ButtonFactory();
const button2_1 = factory.createButton(OS.IOS);
const button2_2 = factory.createButton(OS.ANDROID);

console.log({ button2_1, button2_2 })