interface Props {
  url: string
  label: string
}

const Link: React.FC<Props> = ({url, label}) => <a 
  href={url} 
  target='_blank' 
  rel="noreferrer"> {label}</a>

export default Link