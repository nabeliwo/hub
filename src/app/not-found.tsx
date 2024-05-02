import { Heading } from '@/components/ui/Heading'

export default function NotFound() {
  return (
    <>
      <Heading>404 Not Found</Heading>

      <div className="mt-8">
        <p>
          The page you were looking for could not be found.
          <br />
          The page you indicated may have been deleted or moved.
        </p>
      </div>
    </>
  )
}
