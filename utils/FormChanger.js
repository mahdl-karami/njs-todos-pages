export default function FormChanger(ev, setState) {
  const { name, value } = ev.target;
  setState((prevS) => ({ ...prevS, [name]: value }));
}
