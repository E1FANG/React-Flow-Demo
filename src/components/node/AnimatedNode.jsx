import { useEffect, useState } from "react";
import { Position, Handle } from "@xyflow/react";
import { motion } from "motion/react";

export const AnimatedNode = (props, ...args) => {
  console.log({ props });
  console.log({ args });
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    // hack to avoid animation on first render; for some reason nodes were animating from position 0
    // to their initial position
    setAnimated(true);
  }, []);

  return (
    <motion.div
      className="animated-node"
      // initial={{ opacity: 0 }}
      // animate={{ opacity: 1 }}
      // layout={!props.dragging}
      // transition={{ type: 'spring' }}
      // create new component when animated changes, see issue workaround https://github.com/framer/motion/issues/2238#issue-1809290539
      key={props.id.concat(animated.toString())}
    >
      <Handle type="target" position={Position.Top} />
      <p>{props.data.label}</p>
      <Handle type="source" position={Position.Bottom} />
    </motion.div>
  );
};
