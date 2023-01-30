import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Col, Row } from "reactstrap";
import { noFunctionAvailable, isEmpty, getDateTime, displayValue } from "shared-functions";
import { setLocalPath, setLocalImagePath } from "../utilities/ApplicationFunctions";

const About = (props) => {

  // * Available props: -- 10/21/2022 MF
  // * Properties: -- 10/21/2022 MF
  // * Functions: redirectPage -- 10/21/2022 MF

  const componentName = "About";

  const profileType = useSelector(state => state.applicationSettings.profileType);
  const siteName = useSelector(state => state.applicationSettings.siteName);
  const applicationName = useSelector(state => state.applicationSettings.applicationName);

  let redirectPage = isEmpty(props) === false && isEmpty(props.redirectPage) === false ? props.redirectPage : noFunctionAvailable;

  document.title = "About Philip K. Dick | " + applicationName + " | " + siteName;


  return (
    <Container className="mt-4">
      <Row>
        <Col xs="12">

          <h4 className="text-center">Philip K. Dick: A Brief Biography</h4>

          <h6 className="text-center">by Lord RC</h6>

        </Col>
      </Row>

      <Row>
        <Col xs="10">

          <p>Philip K. Dick and his twin sister, Jane, were born on Dec 16, 1928 in Chicago. The twins were a bit premature and on Jan 29, Jane died. The loss of his twin sister was to have a great affect on Phil's life and writing. In 1935 Phil moved with his mother to Washington D.C. and in 1938 they moved to Berkeley, California. Phil would pretty much stay in California for the rest of his life, either in Berkeley, Pt. Reyes or Santa Ana. He died in 1982 and is buried next to Jane in Ft. Morgan, Colorado.</p>

          <p>PKD started writing at an early age, sending pseudonymous poems and short stories to the Berkeley Gazette in the mid-40s where they appeared in the "Young Author's Page." Around this time Dick discovered Unknown magazine and a love for science fiction. In 1950 he found that Tony Boucher, a famous science fiction writer from Unknown and, in 1949, the co-founder (with J. Francis McComas) of The Magazine Of Fantasy & Science Fiction, lived nearby in Berkeley. At the time Boucher was conducting a workshop for would-be writers. Although PKD attended few of the actual sessions he did establish a close relationship with Boucher. This resulted in his first short-story sale: "Roog" to The Magazine Of Fantasy & Science Fiction in 1951 (after much rewriting). This story didn't appear in F&SF until Feb 1953. His first actual magazine appearance was "Beyond Lies The Wub" in the July 1952 Planet Stories.</p>

        </Col>
        <Col xs="2">

          <img src={setLocalImagePath("https://philipdick.com/images/PKD/Philip_Dick2.jpg", profileType)} alt="Philip K. Dick" />

        </Col>
      </Row>

      <Row>
        <Col xs="12">

          <p>In the Spring of 1952 Phil got serious and enlisted the Scott Meredith Literary Agency in his cause. This agency would represent him for the rest of his writing career. He had already sold 15 short stories by this time and considered himself a professional writer. The early 1950s were a busy time for science fiction writers and PKD wrote and published 82 short stories between 1952 and 1958, as well as three novels.</p>

          <p>His first published novel was Solar Lottery, written in 1954 and published by Ace Books in 1955 as one half of an Ace Double. He was also at this time writing and failing to sell several 'mainstream' novels. Many of these have seen publication since his death. The earliest (1952) and one of the best of these straight novels is Gather Yourselves Together. It is also the last of his novels to be published (1994 WCS Books).</p>

          <p>Following Solar Lottery came The World Jones Made (Ace 1956), The Man Who Japed (Ace 1956), Eye In The Sky (Ace 1957), The Cosmic Puppets (Ace 1957: expanded from "A Glass Of Darkness", written in 1953), Time Out Of Joint (Lippincott 1959), Dr.Futurity (Ace 1960: expanded from "Time Pawn, written in 1953), Vulcan's Hammer (Ace 1960: expanded from "Vulcan's Hammer", written in 1954), and then, in 1962, The Man In The High Castle (Putnam's 1962) -- the novel that would win him the Hugo Award for best novel in that year and decide for once and for all his career as a science fiction writer.</p>

          <p>Recognition from the sf fans in the form of the Hugo Award put to rest his dreams of mainstream recognition. Even though he had written several straight novels during the 50s, Confessions Of A Crap Artist (Entwhistle 1975, written in 1959), arguably being the best of these, PKD could not sell any of them to a large publishing house. He couldn't sell any of them anywhere, in fact, until Paul Williams at Entwhistle books snapped up Crap Artist in 1975. So he decided to concentrate on writing science fiction novels from this point on (they paid better than short stories) and he entered his most prolific period: the 60s. Starting with We Can Build You (DAW 1972, written 1962) and Martian Time Slip (Ballantine 1964, written 1962) and continuing up to Our Friends From Frolix 8 (Ace 1970, written 1969), Philip K. Dick wrote twenty novels. That's twenty novels in seven years, an average of about three a year.</p>

          <p>In 1970 he slowed down a bit, writing more drafts and taking more time over his next novel, Flow My Tears The Policeman Said (Doubleday 1974). This novel won for him the John W. Campbell Memorial Award for best novel of the year in 1975. Next came Deus Irae (Doubleday 1976, written 1964-75), a collaboration with Roger Zelazny that was a long time in completion. A Scanner Darkly (Doubleday 1977, written 1972-72) which also took several years to write and revise was the last of his novels to be written before we enter the "VALIS Period."</p>

          <p>PKD's last four novels, Radio Free Albemuth (Arbor House 1985, written 1976), VALIS (Ballantine 1981, written 1978), The Divine Invasion (Timescape 1981, written 1980) and The Transmigration Of Timothy Archer (Timescape 1982, written 1981) comprise what is known as "The VALIS Trilogy" even though there are four books. What sets these novels apart is that they were written after 1974 when PKD had his 'Pink Beam' experience.</p>

          <p>Much speculation has surrounded the events and explanations of PKD's 2/3-74 experiences. Dick himself spent much of the rest of his life wondering and writing about it in his unpublished, mostly holographic, notes which he called his Exegesis. But essentially what happened was that, while suffering from an impacted wisdom tooth and while taking massive doses of vitamin-C, Phil called a local pharmacist for some medicine. When the delivery girl arrived at his door he was stunned by a beam of pink light which seemed to emanate from a necklace the girl wore. This was one of those 'fish sign' necklaces that are associated with Christianity. He soon found himself in a dual reality, as if ancient Rome was overlaid on Orange County 1974. He felt himself to be an early Christian and beyond time. This story is told in VALIS and some of his speculation (it runs to a million words in the Exegesis) can be found in In Pursuit Of Valis ed. L. Sutin. We hope that soon a complete publication of the Exegesis will appear.</p>

          <a href="https://1999pkdweb.philipdick.com/pkdlife.htm" target="_blank" rel="noopener">https://1999pkdweb.philipdick.com/pkdlife.htm</a>

        </Col>
      </Row>

    </Container>
  );
};

export default About;
