import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppContext } from '../../context/AuthContext'
import { toast } from 'react-toastify'
import {Container,Form, Button, Card} from "react-bootstrap"

const JournalEditor = () => {
  const {id}=useParams()
  const navigate=useNavigate()
  const {entries, updateJournalEntry, journalLoading}=useAppContext()
  const [entry, setEntry]=useState({
    date:"",
    subject:"",
    content:"",
    dayRating:3,
    mood:"😐",
    proudOf:"",
    regret:"",
    couldDoBetter:"",
    productivity:5,
    happy:"",
    futureSelf:"",
    visibility:"private",
  })

  useEffect(()=>{
    const fetchEntry=async()=>{

      if (!entries.length) return
      const selected = entries.find(e => e.id === id)
      if(!selected){
        toast.error("Journal entry not found");
        navigate('/journal-main')
        return
      }

      setEntry(prev => ({
        ...prev,
        ...selected,
         date: selected.date ? selected.date.slice(0, 10) : "",
      }))
    }
    fetchEntry()
  },[id, entries])

  const handleOnChange=(e)=>{
    const { name, value, type } = e.target

    setEntry({
      ...entry,
      [name]: type === "range" ? Number(value) : value
    })
  }
  const handleSubmitUpdatedJournal = async (e) => {
    e.preventDefault()
    if(!entry.subject || !entry.mood || !entry.content){
      return toast.warn("Please fill subject, content and select mood.");
    }
    const success = await updateJournalEntry(id, entry);
    if(success){
      toast.success("Journal updated!");
      navigate("/journal-main");
    } else {
      toast.error("Failed to update journal.");
    }
  }
  return (
    <Container className="my-8 max-w-3xl">
  <Card className="p-6 shadow-lg rounded-2xl border border-gray-200 bg-white">
    <h3 className="mb-4 text-2xl font-semibold text-gray-800 flex items-center gap-2">📝 Edit Journal</h3>

    <Button 
      variant="outline-dark" 
      className="mb-5 w-full hover:bg-gray-100 transition"
      onClick={() => navigate('/journal-main')}
    >
      ← Back
    </Button>

    <Form onSubmit={handleSubmitUpdatedJournal} className="space-y-5">

      <Form.Group>
        <Form.Label className="font-medium text-gray-700">Date</Form.Label>
        <Form.Control 
          type="date" 
          name="date" 
          onChange={handleOnChange} 
          value={entry.date} 
          className="rounded-lg border-gray-300"
        />
      </Form.Group>

      <Form.Group>
        <Form.Label className="font-medium text-gray-700">Subject</Form.Label>
        <Form.Control 
          type="text" 
          name="subject" 
          value={entry.subject} 
          placeholder="Today in a sentence..." 
          onChange={handleOnChange} 
          className="rounded-lg border-gray-300"
        />
      </Form.Group>

      <Form.Group>
        <Form.Label className="font-medium text-gray-700">Write your Heart Out</Form.Label>
        <Form.Control 
          as="textarea" 
          rows={5} 
          name="content" 
          value={entry.content} 
          placeholder="Write freely..." 
          onChange={handleOnChange} 
          className="rounded-lg border-gray-300"
        />
      </Form.Group>

      <Form.Group>
        <Form.Label className="font-medium text-gray-700">Rate your day (1–5)</Form.Label>
        <Form.Range 
          min={1} max={5} name="dayRating" value={entry.dayRating} onChange={handleOnChange} 
          className="mb-1"
        />
        <small className="text-gray-500">Rating: {entry.dayRating}</small>
      </Form.Group>

      <Form.Group>
        <Form.Label className="font-medium text-gray-700">Mood</Form.Label>
        <Form.Select name="mood" value={entry.mood} onChange={handleOnChange} className="rounded-lg border-gray-300">
          <option value="😄">😄 Happy</option>
          <option value="🙂">🙂 Calm</option>
          <option value="😐">😐 Neutral</option>
          <option value="😔">😔 Sad</option>
          <option value="😤">😤 Frustrated</option>
          <option value="😴">😴 Tired</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Form.Label className="font-medium text-gray-700">What are you proud of today?</Form.Label>
          <Form.Control type="text" name="proudOf" value={entry.proudOf} onChange={handleOnChange} className="rounded-lg border-gray-300" />
        </div>
        <div>
          <Form.Label className="font-medium text-gray-700">What do you regret?</Form.Label>
          <Form.Control type="text" name="regret" value={entry.regret} onChange={handleOnChange} className="rounded-lg border-gray-300" />
        </div>
      </Form.Group>

      <Form.Group>
        <Form.Label className="font-medium text-gray-700">What could you have done differently?</Form.Label>
        <Form.Control type="text" name="couldDoBetter" value={entry.couldDoBetter} onChange={handleOnChange} className="rounded-lg border-gray-300" />
      </Form.Group>

      <Form.Group>
        <Form.Label className="font-medium text-gray-700">Productivity (0–10)</Form.Label>
        <Form.Range min={0} max={10} name="productivity" value={entry.productivity} onChange={handleOnChange} />
        <small className="text-gray-500">Level: {entry.productivity}</small>
      </Form.Group>

      <Form.Group>
        <Form.Label className="font-medium text-gray-700">Message to your future self</Form.Label>
        <Form.Control as="textarea" rows={3} name="futureSelf" value={entry.futureSelf} onChange={handleOnChange} className="rounded-lg border-gray-300"/>
      </Form.Group>

      <Form.Group className="flex gap-4">
        <Form.Check type="radio" label="Private" name="visibility" value="private" checked={entry.visibility === "private"} onChange={handleOnChange} />
        <Form.Check type="radio" label="Public" name="visibility" value="public" checked={entry.visibility === "public"} onChange={handleOnChange} />
      </Form.Group>

      <Button type="submit" className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white py-2 rounded-lg">
        {journalLoading ? "Saving..." : "Save Entry"}
      </Button>

    </Form>
  </Card>
</Container>

  )
}

export default JournalEditor
