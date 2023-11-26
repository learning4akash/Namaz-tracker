
import './App.css'
export default function Setting () {
    return (
        <>
            <div className='form'>
       <label > Name</label>
          <input type="text" id="fname" name="firstname" placeholder="Your name.." />

          <label >City</label>
          <select id="country" name="country">
            <option value="0">Dhaka</option>
            <option value="1">india</option>
            <option value="2">qatar</option>
          </select>
          
          <label >Mazhab</label>
          <select id="country" name="country">
            <option value="">Australia</option>
            <option value="canada">Canada</option>
            <option value="usa">USA</option>
          </select>

          <label >salat method</label>
          <select id="country" name="country">
            <option value="0">Dhaka</option>
            <option value="1">Canada</option>
            <option value="2">india</option>
          </select>

          <button className='save'>Save</button>
          <button className='cancle'>cancle</button>

       </div>
        </>
    )
}