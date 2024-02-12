import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import YouTubeIcon from '@mui/icons-material/YouTube';

interface Thumnail {
  url: string,
  createdAt: string,
  title: string,
}

export default function Home() {
  const thumnails: Thumnail[] = [
    {
      url: "http://img.youtube.com/vi/AuQov5W65LY/mqdefault.jpg",
      createdAt: "2/12 09:00",
      title: "マイクラバトミントンリーグ",
    },
    {
      url: "http://img.youtube.com/vi/jHRlw1e3YEg/mqdefault.jpg",
      createdAt: "2/11 18:00",
      title: "逆転裁判4",
    },
    {
      url: "http://img.youtube.com/vi/PFjnhRsJgHU/mqdefault.jpg",
      createdAt: "2/10 21:00",
      title: "私の酸素を吸わないでほしい ／ Vo.羽渦ミウネル",
    },
  ];

  const cardComponent = (thumnail: Thumnail, key: number) => (
    <Card key={key} sx={{ width: 300 }}>
      <CardContent>
        <Typography className="font-bold mb-2 flex items-center">
          <AccessTimeIcon />
          <span className="ml-2">{thumnail.createdAt}</span>
        </Typography>
        <Typography variant="body2">
          <img
            src={`${thumnail.url}`}
            alt="サムネイル"
          />
        </Typography>
        <Typography className="font-bold mt-2 flex items-center">
          <YouTubeIcon className="text-red-600"/>
          <span className="ml-2">{thumnail.title}</span>
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">xxx</Button>
      </CardActions>
    </Card>
  )
  return (
    <>
      <div className="h-screen w-screen flex justify-center items-center">
        <div className="flex">
          {thumnails.map(cardComponent)}
        </div>
      </div>
    </>
  );
}
