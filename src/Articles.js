import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Button, Tabs, Tab } from 'react-bootstrap';
import { BsStarFill, BsStar } from 'react-icons/bs';
const ArticleItem = props => {
  const { article, personalizedData, hideButton } = props;
  const [personalized, setPersonalized] = useState(false);
  const togglePersonalization = (article, personalizedData) => {
    setPersonalized(!personalized);
    article = { ...article, isPersonalized: !personalized }
    personalized ? personalizedData.splice(personalizedData.findIndex(x => x.url === article.url), 1)
    : personalizedData.push(article);
  };
  return (
    <Card className="mb-3">
      <Row>
        <Col xs={12} md={4}>
          <Card.Img variant="top" src={article.urlToImage} alt={article.title} className="card-image" />
        </Col>
        <Col xs={12} md={8}>
          <Card.Body>
            <Card.Title>{article.title}</Card.Title>
            <Card.Text>{article.description}</Card.Text>
            <Card.Subtitle className="mb-2 text-muted">{article.publishedAt.split("T")[0]}</Card.Subtitle>
            <Card.Link href={article.url} target="_blank" rel="noopener noreferrer">Read More</Card.Link>
          </Card.Body>
          {!hideButton && <Button
            variant={personalized ? 'success' : 'outline-secondary'}
            onClick={() => { togglePersonalization(article, personalizedData) }}
            title='Mark as personalized feed'
            className="position-absolute bottom-0 end-0 m-3"
          >
            {personalized ? <BsStarFill /> : <BsStar />}
          </Button>}
        </Col>
      </Row>
    </Card>
  );
};

const Articles = props => {
  const [activeTab, setActiveTab] = useState('newsFeed');
  const personalizedData = props.personalizedData;
  const handleTabSelect = (tab) => {
    setActiveTab(tab);
  };
  return (
    <>
      <Container>
        <Row>
          <Col xs={12}>
            <Tabs
              id="feedTabs"
              activeKey={activeTab}
              onSelect={handleTabSelect}
              className="mb-3"
            >
              <Tab eventKey="newsFeed" title="News Feed">
                <Card className="border-0">
                  <Card.Body className="p-0">
                    {props.articles.map((article, index) => (
                      <ArticleItem article={article} key={article.title + index} personalizedData={personalizedData} hideButton={false} />
                    ))}
                  </Card.Body>
                </Card>
              </Tab>

              <Tab eventKey="personalizedFeed" title="Personalized Feed">
                <Card className="border-0">
                  <Card.Body>
                    {props.personalizedData.map((article, index) => (
                      <ArticleItem article={article} key={article.title + index} personalizedData={personalizedData} hideButton={true} />
                    ))}
                  </Card.Body>
                </Card>
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Articles;
