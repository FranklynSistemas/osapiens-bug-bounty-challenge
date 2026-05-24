import { Box, Typography, Button } from "@mui/material";
import React from "react";
import { withTranslation, WithTranslation } from "react-i18next";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  error: Error | null;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps & WithTranslation,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  handleReset = () => {
    this.setState({ error: null });
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

    return this.props.children;
  }
}

export default withTranslation("app")(ErrorBoundary);
