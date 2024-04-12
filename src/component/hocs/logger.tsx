import React, { useEffect, ComponentType } from "react";

const logger = <T extends Object>(WrappedComponent: ComponentType<T>) => {
  const componentName =
    WrappedComponent.displayName || WrappedComponent.name || "Component";
  const Logger: React.FC<T> = (props) => {
    useEffect(() => {
    //   console.clear();
      console.log(`${componentName} is Mounted`);
      return () => {
        console.log(`${componentName} is UnMounted`);
      };
    }, []);

    return <WrappedComponent {...(props as T)} />;
  };
  Logger.displayName = `Logger(${componentName})`;
  return Logger;
};

export default logger;
