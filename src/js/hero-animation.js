const {
  TweenLite,
  Linear
} = window;

export default class HeroAnimation {
  static init() {
    ([this.textContainerElement] = document.querySelectorAll('.slack__message-input-text-inner'));
    this.sequence1();
  }

  static sequence1() {
    TweenLite.set(this.textContainerElement, { text: '' });
    this.activeTextElement = document.createElement('span');
    this.activeTextElement.className = 'text-wrapper';
    this.textContainerElement.appendChild(this.activeTextElement);

    TweenLite.set('.slack__message', { className: '+=active' });
    TweenLite.to(this.activeTextElement, 0.6, {
      text: '/gone',
      ease: Linear.easeNone,
      onComplete: () => {
        TweenLite.set('.slack__tab--apps', { autoAlpha: 1 });
        TweenLite.set(this.activeTextElement, { text: '/gonebusy' });
        TweenLite.delayedCall(0.6, this.sequence2.bind(this));
      }
    });
  }

  static sequence2() {
    TweenLite.set('.slack__tab--apps', { autoAlpha: 0 });
    TweenLite.to(this.activeTextElement, 1.6, {
      text: '/gonebusy book Interview with @bruce',
      ease: Linear.easeNone,
      onComplete: () => {
        TweenLite.set('.slack__tab--members', { autoAlpha: 1 });
        TweenLite.set(this.activeTextElement, { text: '/gonebusy book Interview with' });

        this.activeTextElement = document.createElement('span');
        this.activeTextElement.className = 'text-wrapper slack__member';
        this.activeTextElement.innerHTML = '@brucewayne';
        this.textContainerElement.appendChild(this.activeTextElement);

        this.activeTextElement = document.createElement('span');
        this.activeTextElement.className = 'text-wrapper';
        this.textContainerElement.appendChild(this.activeTextElement);

        TweenLite.delayedCall(0.6, this.sequence3.bind(this));
      }
    });
  }

  static sequence3() {
    TweenLite.set('.slack__tab--members', { autoAlpha: 0 });
    TweenLite.set('.slack__tab--response', { y: '+=10' });
    TweenLite.to(this.activeTextElement, 0.6, {
      text: 'tomorrow at 1pm',
      ease: Linear.easeNone,
      onComplete: () => {
        TweenLite.to('.slack__tab--response', 1, { y: '-=10', autoAlpha: 1 });
        TweenLite.to('.slack', 1, { y: '+=85' });
        TweenLite.set('.slack__message', { className: '-=active' });
        TweenLite.set(this.textContainerElement, { text: 'Message @teammember' });
      }
    });
  }
}