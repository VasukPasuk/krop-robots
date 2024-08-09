import React from 'react';


interface IMyModalProps {
  children: React.ReactNode
  containerClassname?: string
}

function MyModal(props: IMyModalProps) {
  const {children, containerClassname} = props;
  return (
    <div>
      <div className={containerClassname}>
        {children}
      </div>
    </div>
  )
}

export default MyModal