import React from "react";
import './MemoTypeModal.scss';

const MemoTypeModal = React.forwardRef(({ handleTypeChange, className, ...props }, ref) => {

  return (
    <div className={`MemoTypeModal_root ${className}`} ref={ref} {...props}>
      <button className="MemoType_None" type="button" onClick={() => handleTypeChange('')}>
        비어 있음
      </button>
      <button className="MemoType_Checklist" type="button" onClick={()=>handleTypeChange('Checklist')}>
        Checklist
      </button>
      <button className="MemoType_Note" type="button" onClick={() => handleTypeChange('Note')}>
        Note
      </button>
    </div>
  );
});

export default MemoTypeModal;
