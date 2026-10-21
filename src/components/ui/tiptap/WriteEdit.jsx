import { useLocation } from "react-router";
import Write from "./write";

function WriteEdit() {
  const location = useLocation();
  const post = location.state?.post;

  return <Write post={post} />;
}

export default WriteEdit;