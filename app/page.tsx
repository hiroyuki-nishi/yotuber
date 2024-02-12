import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import YouTubeIcon from '@mui/icons-material/YouTube';

enum LiveStatus {
  Schedule = 0,
  Live = 1,
  Exit = 99,
}

interface Thumnail {
  url: string,
  createdAt: string,
  title: string,
  liveStatus: LiveStatus,
  liveChanel: string,
  liveActor: string,
}

export default function Home() {
  const thumnails: Thumnail[] = [
    {
      url: "http://img.youtube.com/vi/AuQov5W65LY/mqdefault.jpg",
      createdAt: "2/12 09:00",
      title: "マイクラバトミントンリーグ",
      liveStatus: LiveStatus.Schedule,
      liveChanel: "xxx",
      liveActor: "",
    },
    {
      url: "http://img.youtube.com/vi/jHRlw1e3YEg/mqdefault.jpg",
      createdAt: "2/11 18:00",
      title: "逆転裁判4",
      liveStatus: LiveStatus.Live,
      liveChanel: "xxx",
      liveActor: "",
    },
    {
      url: "http://img.youtube.com/vi/PFjnhRsJgHU/mqdefault.jpg",
      createdAt: "2/10 21:00",
      title: "私の酸素を吸わないでほしい ／ Vo.羽渦ミウネル",
      liveStatus: LiveStatus.Exit,
      liveChanel: "xxx",
      liveActor: "",
    },
  ];

  const liveStatusComponent = (liveStatus: LiveStatus) => {
    switch (liveStatus) {
      case LiveStatus.Schedule:
        return <p className="bg-blue-600">配信予定</p>;
      case LiveStatus.Live:
        return <p className="bg-red-600">配信中</p>;
      case LiveStatus.Exit:
        return <p className="bg-gray-300">配信終了</p>;
      default:
        return;
    }
  }

  const cardComponent = (thumnail: Thumnail, key: number) => (
    <Card key={key} sx={{ width: 300 }} className="ml-4">
      <CardContent className="border-b">
        <Typography className="font-bold mb-2 flex items-center">
          <AccessTimeIcon />
          <span className="ml-2">{thumnail.createdAt}</span>
        </Typography>

        <div className="relative">
          <Typography variant="body2">
            <img
              src={`${thumnail.url}`}
              alt="サムネイル"
            />
          </Typography>
          <div className="absolute bottom-1 right-0 w-20 text-sm text-white	text-center">
            {liveStatusComponent(thumnail.liveStatus)}
          </div>
        </div>

        <Typography className="font-bold mt-2 flex items-center">
          <YouTubeIcon className="text-red-600"/>
          <span className="ml-2">{thumnail.title}</span>
        </Typography>
      </CardContent>

      <CardActions>
        <div className="grid grid-cols-2 grid-rows-2 gap-4 text-xs ml-2 h-14">
          <div className="font-bold">配信ch</div>
          <div>{thumnail.liveChanel}</div>
          <div className="font-bold">出演</div>
          <div>{thumnail.liveActor}</div>
        </div>
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
