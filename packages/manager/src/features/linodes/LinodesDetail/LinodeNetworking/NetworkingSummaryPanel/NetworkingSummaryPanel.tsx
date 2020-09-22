import * as React from 'react';
import Paper from 'src/components/core/Paper';
import { makeStyles, Theme } from 'src/components/core/styles';
import Grid from 'src/components/Grid';
import DNSResolvers from './DNSResolvers';
import NetworkTransfer from './NetworkTransfer';
import TransferHistory from './TransferHistory';
import Hidden from 'src/components/core/Hidden';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'row-nowrap',
    justifyContent: 'flex-start',
    alignItems: 'start',
    padding: theme.spacing(3),
    paddingBottom: theme.spacing(2) + theme.spacing(1) / 2
  },
  transferHistoryContainer: {
    padding: '16px 0px',
    flex: 1.3,
    [theme.breakpoints.up('sm')]: {
      padding: '0px 16px'
    },
    [theme.breakpoints.up('md')]: {
      padding: '0px 32px'
    }
  },
  dnsResolverContainer: {
    flex: 1,
    paddingTop: 8,
    [theme.breakpoints.up('md')]: {
      paddingTop: 0
    }
  }
}));

interface Props {
  linodeRegion: string;
  linodeID: number;
  linodeCreated: string;
  linodeLabel: string;
}

type CombinedProps = Props;

const LinodeNetworkingSummaryPanel: React.FC<CombinedProps> = props => {
  const { linodeID, linodeRegion, linodeCreated, linodeLabel } = props;
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Grid item>
        <NetworkTransfer linodeID={linodeID} linodeLabel={linodeLabel} />
      </Grid>
      <Grid item className={classes.transferHistoryContainer}>
        <TransferHistory linodeID={linodeID} linodeCreated={linodeCreated} />
      </Grid>
      <Hidden smDown>
        <Grid item className={classes.dnsResolverContainer}>
          <DNSResolvers region={linodeRegion} />
        </Grid>
      </Hidden>
    </Paper>
  );
};

export default React.memo(LinodeNetworkingSummaryPanel);
