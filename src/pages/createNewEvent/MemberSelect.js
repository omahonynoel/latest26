
import { useFirestore } from '../../hooks/useFirestore'



export default function MemberSelect({members}) {




  return (
    <select id="cars" name="cars">
{members.map((member) => (
    <option key={member.id} value={member.name}>{member.name} {member.surname}</option>
    ))}
  
  </select>

  )
}


