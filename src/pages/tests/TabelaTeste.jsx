import React, { useEffect, useState } from "react";
import { Avatar, Tag, TagGroup } from "rsuite";

function TabelaTeste() {

  return (
    <>

    <TagGroup>
    <Tag color="orange">
      <Avatar circle style={{ background: '#000' , color: 'red'}} size="xs">P</Avatar>
      34
    </Tag>


    </TagGroup>
    </>
  );
}

export default TabelaTeste;