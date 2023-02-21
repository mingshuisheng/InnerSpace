type Props = {
  params: {
    noteId: string
  }
}

export default function NoteDetail({params}: Props) {

  return (
    <div>
      note详情：{params.noteId}
    </div>
  )
}
