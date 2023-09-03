import { Chip } from "@mui/material";
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

    <Chip label={"30"} size="small" avatar={<Avatar circle style={{ fontSize: '1.008em', background:  "white" }}>G</Avatar>} />



    </TagGroup>
    </>
  );
}

export default TabelaTeste;