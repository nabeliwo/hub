import { h } from 'hastscript'
import { visit, SKIP } from 'unist-util-visit'

import type { Root, ElementContent, Element } from 'hast'

const isImgElement = (el: ElementContent): el is Element => {
  return 'tagName' in el && el.tagName === 'img'
}

const buildFigure = (el: Element) => {
  const title = el.properties.title

  // 画像タグの雛形で title が空文字のまま残っていても空の figcaption を作らない
  if (typeof title === 'string' && title !== '') {
    return h('figure', [h('img', { ...el.properties }), h('figcaption', title)])
  } else {
    return h('figure', [h('img', { ...el.properties })])
  }
}

export const rehypeImageFigure = () => {
  return (tree: Root) => {
    if (!Array.isArray(tree.children)) {
      return tree
    }

    visit(tree, { tagName: 'p' }, (el, _, parent) => {
      if (parent?.type !== 'root') {
        return
      }

      const images = el.children.filter((child) => isImgElement(child))

      if (images.length === 0) {
        return
      }

      const figures = images.map((image) => buildFigure(image))

      el.tagName = 'div'
      el.children = figures
    })

    return tree
  }
}

/** テーブルを div でラップして、狭い画面では横スクロールできるようにする */
export const rehypeTableScroll = () => {
  return (tree: Root) => {
    visit(tree, { tagName: 'table' }, (el, index, parent) => {
      if (parent?.type !== 'root' || index === undefined) {
        return
      }

      parent.children[index] = h('div', { class: 'tableScroll' }, [el])

      // ラップした div の中の table を再訪問して無限にラップしないようにする
      return [SKIP, index + 1]
    })

    return tree
  }
}
