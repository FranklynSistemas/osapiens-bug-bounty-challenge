import { Box, Typography, Button } from "@mui/material";
import React from "react";
import { withTranslation, WithTranslation } from "react-i18next";
import { withRouter, RouteComponentProps } from "react-router-dom";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  error: Error | null;
  resetKey: number;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps & WithTranslation & RouteComponentProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { error: null, resetKey: 0 };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      error,
      resetKey: 0,
    };
  }

  handleReset = () => {
    this.setState(
      (prev) => ({ error: null, resetKey: prev.resetKey + 1 }),
      () => {
        this.props.history.push("/");
      },
    );
  };

  render() {
    const { t } = this.props;

    if (this.state.error) {
      return (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="100vh"
        >
          <Typography variant="h4" gutterBottom>
            {t("error.title")}
          </Typography>
          <Typography variant="body1" color="textSecondary" mb={3}>
            {this.state.error.message}
          </Typography>
          <Button variant="contained" onClick={this.handleReset}>
            {t("error.retry")}
          </Button>
        </Box>
      );
    }

    return <Box key={this.state.resetKey}>{this.props.children}</Box>;
  }
}

export default withTranslation("app")(withRouter(ErrorBoundary));
