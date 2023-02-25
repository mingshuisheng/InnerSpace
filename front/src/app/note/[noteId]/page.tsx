type Props = {
  params: {
    noteId: string
  }
}

export default function NoteDetail({params}: Props) {

  return (
    <div>
      {
        new Array(100).fill(0).map((_, index) => {
          return (
            <div key={index}>
              note详情：{params?.noteId}
            </div>
          )
        })
      }
    </div>
  )
}
