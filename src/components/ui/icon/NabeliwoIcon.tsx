import classNames from 'classnames'

export function NabeliwoIcon() {
  return (
    <span
      className={classNames(
        ['relative', 'inline-block'],
        [
          'before:absolute',
          'before:w-0',
          'before:h-0',
          'before:border-transparent',
          'before:border-solid',
          "before:content-['']",
        ],
        [
          'after:absolute',
          'after:w-0',
          'after:h-0',
          'after:border-transparent',
          'after:border-solid',
          "after:content-['']",
        ],
        [
          'before:bottom-[8px]',
          'before:left-0',
          'before:border-x-[12px]',
          'before:border-b-[20px]',
          'before:border-b-blue',
        ],
        [
          'after:top-[14px]',
          'after:left-[6px]',
          'after:border-x-[6px]',
          'after:border-b-[10px]',
          'after:border-b-white',
          'after:rotate-180',
        ],
      )}
    />
  )
}
