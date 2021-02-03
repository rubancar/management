import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  notificationContainer: {
    display: "flex",
    alignItems: "center",
  },
  notificationContained: {
    borderRadius: 45,
    height: 45,
    boxShadow: theme.customShadows.widgetDark,
  },
  notificationContainedShadowless: {
    boxShadow: "none",
  },
  notificationIconContainer: {
    minWidth: 45,
    height: 45,
    borderRadius: 45,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 24,
  },
  notificationIconContainerContained: {
    fontSize: 18,
    color: "#FFFFFF80",
  },
  notificationIconContainerRounded: {
    marginRight: theme.spacing(2),
  },
  containedTypography: {
    color: "white",
  },
  messageContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexGrow: 1,
  },
  extraButton: {
    color: "white",
    "&:hover, &:focus": {
      background: "transparent",
    },
  },
    // Toast styles
    notificationItem: {
        marginTop: theme.spacing(2),
    },
    notificationCloseButton: {
        position: "absolute",
        right: theme.spacing(2),
    },
    toastsContainer: {
        width: 400,
        marginTop: theme.spacing(6),
        right: 0,
    },
    progress: {
        visibility: "hidden",
    },
}));
