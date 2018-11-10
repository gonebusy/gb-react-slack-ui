const {
  TweenLite,
  Linear
} = window;

export default class HeroAnimation {
  static init() {
    ([this.textContainerElement] = document.querySelectorAll('.slack__message-input-text-inner'));
    TweenLite.delayedCall(1, this.sequence1.bind(this));
  }

  static sequence1() {
    TweenLite.set('.slack__member', { css: { display: 'block' } });
    TweenLite.set(['.slack', '.slack__tab--response'], { clearProps: 'all' });
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
        TweenLite.delayedCall(1.2, this.sequence2.bind(this));
      }
    });
  }

  static sequence2() {
    TweenLite.set('.slack__tab--apps', { autoAlpha: 0 });
    TweenLite.to(this.activeTextElement, 1.6, {
      text: '/gonebusy book Interview with @',
      ease: Linear.easeNone,
      onComplete: () => {
        TweenLite.set('.slack__tab--members', { autoAlpha: 1 });
        TweenLite.delayedCall(0.6, this.sequence3.bind(this));
      }
    });
  }

  static sequence3() {
    TweenLite.to(this.activeTextElement, 0.2, {
      text: '/gonebusy book Interview with @bruce',
      onComplete: () => {
        TweenLite.set('.slack__member', { css: { display: 'none' } });
        TweenLite.set('.slack__member--active', { css: { display: 'block' } });
        TweenLite.delayedCall(0.6, this.sequence4.bind(this));
      }
    });
  }

  static sequence4() {
    TweenLite.set(this.activeTextElement, { text: '/gonebusy book Interview with ' });

    this.activeTextElement = document.createElement('span');
    this.activeTextElement.className = 'text-wrapper slack__mention';
    this.activeTextElement.innerHTML = '@brucewayne';
    this.textContainerElement.appendChild(this.activeTextElement);

    this.activeTextElement = document.createElement('span');
    this.activeTextElement.className = 'text-wrapper';
    this.textContainerElement.appendChild(this.activeTextElement);

    TweenLite.set('.slack__tab--members', { autoAlpha: 0 });
    TweenLite.to(this.activeTextElement, 0.6, {
      text: 'tomorrow at 1pm',
      ease: Linear.easeNone,
      onComplete: () => {
        TweenLite.delayedCall(0.6, this.sequence5.bind(this));
      }
    });
  }

  static sequence5() {
    TweenLite.set('.slack__message', { className: '-=active' });
    TweenLite.set(this.textContainerElement, { text: 'Message' });
    TweenLite.set('.slack__tab--response', { y: '-=20' });
    TweenLite.to('.slack__tab--response', 1, {
      y: '+=20',
      autoAlpha: 1,
      onComplete: () => {
        TweenLite.delayedCall(1, this.sequence1.bind(this));
      }
    });
  }
}