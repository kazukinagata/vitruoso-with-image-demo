- AutoSizer いらなそう（height: 100%で行ける）

  - https://virtuoso.dev/auto-resizing/

- margin-y を入れるとカクつく
- img なしリストの場合でも、overscan.reverse に小さい値を入れると逆にカクつく傾向（overscan 未指定や、大きい値だと安定する）
- img タグが入っていても、img の height が 100%で親要素の高さが決まっていればカクつかない。高さが決まってないとカクつく

  - overscan を拡げても解消しない
  - itemSize で image の width, height を教えてあげてもダメ
  - isScrolling で Skeleton 表示させてもカクつく、むしろひどくなる（やはり高さを決めてやる必要がありそう）
    - 画像ロード完了 -> レンダリング のタイミングで、高さ指定がない画像は高さが一瞬ゼロになって、レンダリング後に高さが再計算されてる感じ
    - 普通に親要素の高さを決めてやるのが王道っぽい
    - imgEl の onLoad 属性を使って、画像のレンダリング完了まで一時的に高さのある親要素で囲んでやるみたいな hacky な方法もあるかも？

- gaudiy の場合、画像を常に Skeleton に変えてもカクつくので他の原因もありそう

  - margin の再点検
  - itemContent に渡すコンポーネントの memo 化は気休め程度かもしれないけど一応試す

  - nextjs の Image コンポーネント
  - prepending items

- その他調査結果
  - 初回レンダリング時の挙動
    - index がどこにあっても、初回に atTopStateChange {atTop: true|false}, atBottomStateChange {atBottom: true|false}が実行される
      - `initialTopMostItemIndex={{ index: "LAST" }}`にしておくと、endReached も呼ばれ、atBottomStateChange がもう一回呼ばれる
      - `initialTopMostItemIndex={{ index: 0 }}`（あるいは未指定）にしておくと、startReached も呼ばれる
    - endReached, startReached は overscan で当該要素がレンダリングされた場合にも呼ばれる
    - endReached は一回呼ばれると、下方に新しい要素が追加されるまで呼ばれない
    - startReached は一回呼ばれ、上方に新しい要素が追加されてもそのままでは二度と呼ばれない
      - props.firstItemIndex を渡す必要がある
        - firstItemIndex を渡すと、startReached callback の引数に渡される index が firstItemIndex の値になっていた
        - startReached の発火条件は、初めてリストの最上部に到達する || (2 回目以降でリストの最上部に到達 & firstItemIndex が前回から減っている) ということみたい
          - fistItemIndex の前回との減少数を見て、prepend 後の offset を決めてくれている模様
            - fistItemIndex の初期値は最悪適当でもいいが、prepend の度に正確な減算をしていかないと表示位置の維持は上手く機能しない
