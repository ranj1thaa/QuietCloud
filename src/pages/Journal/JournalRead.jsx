import { useNavigate, useParams } from 'react-router-dom'
import { useAppContext } from '../../context/AuthContext'
import { useEffect, useState } from 'react'
import { Container, Card, Button, Form } from 'react-bootstrap'
import { toast } from 'react-toastify'

const JournalRead = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { entries } = useAppContext()

  const [entry, setEntry] = useState(null)

  useEffect(() => {
    if (!entries.length) return

    const selected = entries.find(e => e.id === id)
    if (!selected) {
      toast.error("Journal entry not found")
      navigate('/dashboard')
      return
    }

    setEntry({
      ...selected,
      date: selected.date
        ? selected.date.slice(0, 10)
        : selected.createdAt?.toDate().toISOString().slice(0, 10)
    })
  }, [id, entries])

  if (!entry) return null

  return (
    <Container className="my-8 max-w-3xl">
      <Card className="p-6 shadow-lg rounded-2xl border border-gray-200 bg-white">
    <h3 className="mb-4 text-2xl font-semibold text-gray-800 flex items-center gap-2">📝 Journal Read</h3>

    <Button 
      variant="outline-secondary" 
      className="mb-5 w-full hover:bg-gray-100 transition"
      onClick={() => navigate('/dashboard')}
    >
      ← Back
    </Button>

    <Form className="space-y-5">

      <Form.Group>
        <Form.Label className="font-medium text-gray-700">Date</Form.Label>
        <Form.Control type="date" value={entry.date} readOnly className="rounded-lg border-gray-300 bg-gray-50"/>
      </Form.Group>

      <Form.Group>
        <Form.Label className="font-medium text-gray-700">Subject</Form.Label>
        <Form.Control type="text" value={entry.subject || ""} readOnly className="rounded-lg border-gray-300 bg-gray-50"/>
      </Form.Group>

      <Form.Group>
        <Form.Label className="font-medium text-gray-700">Write your Heart Out</Form.Label>
        <Form.Control as="textarea" rows={5} value={entry.content || ""} readOnly className="rounded-lg border-gray-300 bg-gray-50"/>
      </Form.Group>

      <Form.Group className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Form.Label className="font-medium text-gray-700">What do you regret?</Form.Label>
          <Form.Control type="text" value={entry.regret || ""} readOnly className="rounded-lg border-gray-300 bg-gray-50"/>
        </div>
        <div>
          <Form.Label className="font-medium text-gray-700">What could you have done differently?</Form.Label>
          <Form.Control type="text" value={entry.couldDoBetter || ""} readOnly className="rounded-lg border-gray-300 bg-gray-50"/>
        </div>
      </Form.Group>

      <Form.Group>
        <Form.Label className="font-medium text-gray-700">Message to your future self</Form.Label>
        <Form.Control as="textarea" rows={3} value={entry.futureSelf || ""} readOnly className="rounded-lg border-gray-300 bg-gray-50"/>
      </Form.Group>

      <Form.Group className="flex gap-4">
        <Form.Check type="radio" label="Private" checked={entry.visibility === "private"} readOnly />
        <Form.Check type="radio" label="Public" checked={entry.visibility === "public"} readOnly />
      </Form.Group>

      <Button variant="dark" className="w-full hover:bg-gray-800 transition" onClick={() => navigate('/dashboard')}>
        Back to Dashboard
      </Button>

    </Form>
  </Card>
    </Container>

  )
}

export default JournalRead
