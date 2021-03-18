import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def main() -> None:
    logger.info("Creating initial data")
    logger.info("Initial data created")


if __name__ == "__main__":
    main()
