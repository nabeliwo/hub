import { h } from 'hastscript'
import { visit } from 'unist-util-visit'

import type { Root, ElementContent, Element } from 'hast'

const isImgElement = (el: ElementContent): el is Element => {
  return 'tagName' in el && el.tagName === 'img'
}

const buildFigure = (el: Element) => {
  const title = el.properties.title

  if (typeof title === 'string') {
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
