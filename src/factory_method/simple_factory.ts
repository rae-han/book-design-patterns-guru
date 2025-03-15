class IOSButton { }

class AndroidButton { }

const OS = {
  IOS: 'ios',
  ANDROID: 'android',
} as const

type OS = typeof OS[keyof typeof OS]

// Without Factory
const iosButton1 = OS.IOS === 'ios' ? new IOSButton() : new AndroidButton()
const androidButton1 = OS.ANDROID === 'android' ? new IOSButton() : new AndroidButton()

console.log({ iosButton1, androidButton1 })

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
const iosButton2 = factory.createButton(OS.IOS);
const androidButton2 = factory.createButton(OS.ANDROID);

console.log({ iosButton2, androidButton2 })
