import React, { useState } from 'react';
import { Card, CardContent, CardHeader, Collapse, IconButton, Theme } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { makeStyles } from 'tss-react/mui';
import { theme } from 'app/theme';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const collapseStyles = makeStyles()(() => ({
  expand: {
    marginLeft: 'auto',
    transform: 'rotate(180deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.standard,
    }),
  },
  expandOpen: {
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.standard,
    }),
  },
}));

/**
 * A generic collapsible form section with a title icon, title text and paper background.
 * @param title The title of the section.
 * @param avatar The icon to display next to the title.
 * @param startExpanded Decides whether the section is expanded or closed on render.
 * @param children Children component to be displayed within the form section.
 */

type Props = {
  title: string;
  avatar?: React.ReactNode;
  startExpanded?: boolean;
  hideExpandButton?: boolean;
  children: React.ReactNode;
};

export const FormSection = ({
  title,
  avatar,
  startExpanded = true,
  hideExpandButton = false,
  children,
}: Props) => {
  const { classes } = collapseStyles();
  const [expanded, setExpanded] = useState(startExpanded);

  function handleExpandClick() {
    setExpanded(!expanded);
  }

  return (
    <>
      <Card
        onClick={!expanded ? handleExpandClick : undefined}
        elevation={0}
        id={`${title.split(' ')[0]}-section`}
      >
        <CardHeader
          title={title}
          avatar={avatar}
          titleTypographyProps={{ variant: 'subtitle1', color: 'primary' }}
          action={
            !hideExpandButton && (
              <IconButton
                className={expanded ? classes.expand : classes.expandOpen}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
                id={`${title.split(' ')[0]}-expand`}
              >
                <ExpandMoreIcon />
              </IconButton>
            )
          }
        />
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>{children}</CardContent>
        </Collapse>
      </Card>
    </>
  );
};
