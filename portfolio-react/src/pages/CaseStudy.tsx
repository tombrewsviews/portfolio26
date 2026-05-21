import { useParams } from 'react-router-dom';

export default function CaseStudy() {
  const { slug } = useParams();
  return <main className="container">Case study: {slug}</main>;
}
