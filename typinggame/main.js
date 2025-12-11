// 変数の初期化
let untyped = '';
let typed = '';
let score = 0;
let men = '';

// 必要なHTML要素の取得
const untypedfield = document.getElementById('untyped');
const typedfield = document.getElementById('typed');
const wrap = document.getElementById('wrap');
const start = document.getElementById('start');
const count = document.getElementById('count');
const meanning = document.getElementById('mean')

// 複数のテキストを格納する配列
const textLists = [
 {word : 'ability', mean: '能力'},
 {word : 'advice', mean: '助言'},
 {word : 'answer', mean: '答え'},
 {word : 'beauty', mean: '美しさ'},
 {word : 'chance', mean: 'チャンス'},
 {word : 'change', mean: '変化'},
 {word : 'danger', mean: '危険'},
 {word : 'dream', mean: '夢'},
 {word : 'energy', mean: 'energy'},
 {word : 'experience', mean: '経験'},
 {word : 'friend', mean: '友達'},
 {word : 'future', mean: '未来'},
 {word : 'happiness', mean: '幸せ'},
 {word : 'information', mean: '情報'},
 {word : 'knowledge', mean: '知識'},
 {word : 'memory', mean: '記憶'},
 {word : 'problem', mean: '問題'},
 {word : 'result', mean: '結果'},
 {word : 'success', mean: '成功'},
 {word : 'time', mean: '時間'},
 {word : 'achieve', mean: '達成する'},
 {word : 'believe', mean: '信じる'},
 {word : 'choose', mean: '選ぶ'},
 {word : 'describe', mean: '説明する'},
 {word : 'enjoy', mean: '楽しむ'},
 {word : 'explain', mean: '説明する'},
 {word : 'feel', mean: '感じる'},
 {word : 'forget', mean: '忘れる'},
 {word : 'hope', mean: '希望する'},
 {word : 'improve', mean: '向上する'},
 {word : 'know', mean: '知る'},
 {word : 'learn', mean: '学ぶ'},
 {word : 'make', mean: '作る'},
 {word : 'need', mean: '必要とする'},
 {word : 'offer', mean: '提供する'},
 {word : 'prefer', mean: '好む'},
 {word : 'realize', mean: '気づく'},
 {word : 'remember', mean: '覚えている'},
 {word : 'suggest', mean: '提案する'},
 {word : 'understand', mean: '理解する'},
];

// ランダムなテキストを表示
const createText = () => {

  // 正タイプした文字列をクリア
  typed = '';
  typedfield.textContent = typed;


  // 配列のインデックス数からランダムな数値を生成する
  let random = Math.floor(Math.random() * textLists.length);

  // 配列からランダムにテキストを取得し画面に表示する
  untyped = textLists[random].word;
  untypedfield.textContent = untyped;
  mean = textLists[random].mean;
  meaning.textContent = mean;

};

// キー入力の判定
const keyPress = e => {

  // 誤タイプの場合
  if(e.key !== untyped.substring(0, 1)) {
    wrap.classList.add('mistyped');
    // 100ms後に背景色を元に戻す
    setTimeout(() => {
      wrap.classList.remove('mistyped');
    }, 100);
    return;
  }

  // 正タイプの場合
  // スコアのインクリメント
  score++;
  wrap.classList.remove('mistyped');
  typed += untyped.substring(0, 1);
  untyped = untyped.substring(1);
  typedfield.textContent = typed;
  untypedfield.textContent = untyped;

  // テキストがなくなったら新しいテキストを表示
  if(untyped === '') {
    createText();
  }
};

  // タイピングスキルのランクを判定
  const rankCheck = score => {

  // テキストを格納する変数を作る
  let text = '';
 
  // スコアに応じて異なるメッセージを変数textに格納する
  if(score < 100) {
    text = `あなたのランクはCです。\nBランクまであと${100 - score}文字です。`;
  } else if(score < 200) {
    text = `あなたのランクはBです。\nAランクまであと${200 - score}文字です。`;    
  } else if(score < 300) {
    text = `あなたのランクはAです。\nSランクまであと${300 - score}文字です。`;    
  } else if(score >= 300) {
    text = `あなたのランクはSです。\nおめでとうございます!`;    
  }
 
  // 生成したメッセージと一緒に文字列を返す
  return `${score}文字打てました!\n${text}\n【OK】リトライ / 【キャンセル】終了`;
};

  // ゲームを終了
  const gameOver = id => {
    clearInterval(id);

    // 課題 タイマーが0になったら「タイムアップ」を表示する
    
    // キーボードのイベントリスナーを解除
    document.removeEventListener('keypress', keyPress);

    // タイムアップ を表示する
    typedfield.textContent = ''
    untypedfield.textContent = 'お疲れさまでした☆'

    // 表示された後にゲーム終了処理
    setTimeout(() => {
      const result = confirm(rankCheck(score));

      // OKボタンをクリックされたらリロードする
      if(result) {
        window.location.reload();
      } 
    }, 10);
  };
    

  // カウントダウンタイマー
  const timer = () => {

    // タイマー部分のHTML要素（p要素）を取得する
    let time = count.textContent;

    const id = setInterval(() => {

      // カウントダウンする
      time--;
      count.textContent = time;

      // カウントが0になったらタイマーを停止する
      if(time <= 0) {
        clearInterval(id);
        gameOver(id);
      }
    }, 1000);
  };

  // ゲームスタート時の処理
  start.addEventListener('click', () => {
    score = 0;

    // カウントダウンタイマーを開始する
    timer();

    // ランダムなテキストを表示する
    createText();

    // 「スタート」ボタンを非表示にする
    start.style.display = 'none';

    // カウント数を表示する
    typenow.style.display = 'block';

    // キーボードのイベント処理
    document.addEventListener('keypress', keyPress);
  });

  untypedfield.textContent = 'スタートボタンで開始';
