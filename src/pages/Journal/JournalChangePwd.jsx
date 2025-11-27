import { useRef, useState } from "react";
import { useAppContext} from "../../context/AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const JournalChangePwd = () => {
  const [pinNew, setPinNew]=useState("")
  const [pinOld, setPinOld]=useState("")
  const [pinConf, setPinConf]=useState("")
  const { changeJournalPassword } = useAppContext();
  const navigate = useNavigate();

  const handleSubmit=async(e)=>{
    e.preventDefault()
    try{
      if(!pinNew || !pinOld){
        return toast.warn("Please fill all fields")
      }

      if(pinNew.length !==4 || !pinOld.length !==4){
        return toast.warn("PIN must be 4 digits");
      }

      if(pinNew !=pinConf){
        return toast.warn("New PINs do not match");
      }

      const {ok, reason}=await changeJournalPassword(pinOld, pinNew)
      if(ok){
        toast.success("PIN changed");
        navigate("/journal-access"); 
      }else {
         if (reason === "INVALID") toast.error("Old PIN incorrect");
         else toast.error("Failed to change PIN");
      }
    }catch(err){
      toast.error("Something went wrong")
    }
  }
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center",minHeight: "100vh",padding: "30px"}}>
      <Form style={{width: "90%", maxWidth: "800px", minWidth: "280px", padding: "25px", borderRadius: "10px", boxShadow: "0px 4px 12px rgba(0,0,0,0.3)", background: "rgba(255,255,255,0.3)"}} onSubmit={handleSubmit}>
        <h3 className="text-center mb-3">Change Journal PIN</h3>

        <Form.Group className="mb-3" style={{marginTop:'40px'}}>
          <Form.Control  type="number" placeholder="Enter Your Old Password" value={pinOld} onChange={(e) => { const value = e.target.value.slice(0, 4); if (/^\d*$/.test(value)) setPinOld(value);}} className="p-3 text-center fs-5" />
          </Form.Group>

          <div style={{ display: 'flex', gap: '10px' }}>
            <Form.Group className="mb-3" style={{ flex: 1 }}>
              <Form.Control
                type="number"
                placeholder="New Password"
                value={pinNew}
                onChange={(e) => {
                  const value = e.target.value.slice(0, 4);
                  if (/^\d*$/.test(value)) setPinNew(value);
                }}
                className="p-3 text-center fs-5"
              />
            </Form.Group>

            <Form.Group className="mb-3" style={{ flex: 1 }}>
              <Form.Control
                type="number"
                placeholder="Confirm Password"
                value={pinConf}
                onChange={(e) => {
                  const value = e.target.value.slice(0, 4);
                  if (/^\d*$/.test(value)) setPinConf(value);
                }}
                className="p-3 text-center fs-5"
              />
            </Form.Group>
          </div>  

        <Button type="submit" className="w-100 p-2.5 mt-3" variant="success">
          Change PIN
        </Button>
      </Form>
    </div>
  );
}

export default JournalChangePwd
