"use client";
import React, {useState} from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import MenuIcon from '@mui/icons-material/Menu';
import Link from "next/link";
import * as CSS from "csstype";


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


async function fetchYoutuberData(): Promise<Thumnail[]> {
  try {
    const response = await fetch('http://localhost:3001/youtuber');
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data: Thumnail[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export default async function Home() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const thumnails = await fetchYoutuberData();
  type Props = {
    children: React.ReactNode;
  };

  const TitleComponent = ({ children }: Props) => {
    return (
      <div className="pt-6 flex justify-center items-center">
        {children}
      </div>
    );
  }

  const menuOptions = [
    { name: "VOMS.net", link: "/" },
    { name: "Concept", link: "concept" },
  ];

  const divStyle: CSS.Properties = {
    textAlign: 'center',
  }

  // html返す
  const liveStatusComponent = (liveStatus: LiveStatus) => {
    switch (liveStatus) {
      case LiveStatus.Schedule:
        return <p className="bg-blue-600" style={divStyle}>配信予定</p>;
      case LiveStatus.Live:
        return <p className="bg-red-600">配信中</p>;
      case LiveStatus.Exit:
        return <p className="bg-gray-300">配信終了</p>;
      default:
        return;
    }
  }

  const cardComponent = (thumnail: Thumnail, key: number) => {
    return (<Card key={key} sx={{ width: 300 }} className="ml-4">
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
          <YouTubeIcon className="text-red-600" />
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
  };


  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div
        className="h-screen w-screen"
        style={
          { backgroundImage: "url(/background.jpeg)", backgroundSize: "cover", resize: "both" }}
      >
        <div>
          <div className="grid grid-cols-3 gap-4">
            <div></div>
            <div>
              <TitleComponent>
                <h2 className="text-8xl font-extrabold">VOMS.net</h2>
              </TitleComponent>
            </div>

            <div className="flex items-center p-20px justify-end">
              <Link href="/">#voms_project</Link>
              <div className="pl-20">
                <span>share</span>
                <TwitterIcon color="primary" className="ml-2" />
              </div>
              <IconButton
                className="mr-28"
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
              >
                <MenuIcon sx={{ fontSize: 48 }} />
              </IconButton>
              <Menu
                id="long-menu"
                MenuListProps={{
                  'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                  style: {
                    maxHeight: 48 * 4.5,
                    width: '20ch',
                  },
                }}
              >
                {
                  menuOptions.map((option) => (
                    <MenuItem
                      key={option.name}
                      onClick={handleClose}
                    >
                      <Link href={option.link}>{option.name}</Link>
                    </MenuItem>
                  ))
                }
              </Menu>
            </div>
          </div>

          <TitleComponent>
            <h3 className="font-extrabold">VTuber “VOMS Project” Official Web Site</h3>
          </TitleComponent>

          <TitleComponent>
            <h3 className="text-2xl font-extrabold">Live Schedule</h3>
          </TitleComponent>
        </div>

        <div className="flex  justify-center">
          {thumnails?.map(cardComponent)}
        </div>
      </div>
    </>
  );
}
