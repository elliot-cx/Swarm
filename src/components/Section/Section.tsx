import { MouseEventHandler, ReactNode } from 'react';
import styles from './Section.module.css';

type Link={
  // this type is used fot the links <a> passed as props
  // It includes a route, a html id, a text <p>, a font awesome icon, a font awesome icon size and 
  // a MouseEventHandler for the onClick listener
  route:string,
  id?:string,
  text?:string,
  description?:string,
  iconId?:string,
  classNames?:string[],
  onClickEvent?:MouseEventHandler<HTMLAnchorElement>
  onMouseHoverEvent?:any,
  onMouseEnter?:any,
  onMouseLeave?:any
}
type Props = {
// Typed used for the props of this component, it includes an html id, <h1> title, <h2> title, <p> text,
// an array of links <a> and functions to run  
className?:any
linksDivClasses?:string[],
id?:string
title1?:string
title2?:string
text?:string 
links?:Array<Link>,
contentChildrenNodes?:Array<ReactNode>,
childrenNodes?:Array<ReactNode>,
isGrowing?:boolean
}
export default function Section({
  className,
  linksDivClasses,
  id,
  links,
  text,
  title1,
  title2,
  childrenNodes,
  contentChildrenNodes,
  isGrowing = true,
}: Props) {

  const getClassNameString = (classNames: string[] | undefined): string => {
    if (!classNames) return '';
    return classNames.map((className) => styles[className] ?? '').join(' ');
  };
  
  return (
    <div className={`${className ? styles[className] : undefined} ${isGrowing ? styles.growingSection : styles.section}`} id={id ? styles[id] : undefined}>
        { title1 ? <h1 className='sectionTitle'>{ title1 }</h1> : null }
        { title2 ||  text || links ? 
          <div className={styles.content}>
              { title2 ? <h2>{title2}</h2> : null }
              {  text ? <p>{text}</p> : null }
              { links 
                ? <div className={`${styles.linksDiv} ${getClassNameString(linksDivClasses)}`}>
                  {links.map((link: Link, index: number) => {
                    return(
                      <a key={index} className={getClassNameString(link.classNames)} id={link.id ? styles[link.id] : undefined} href={link.route} 
                      onMouseOver={link?.onMouseHoverEvent} onMouseEnter={link?.onMouseEnter} onMouseLeave={link?.onMouseLeave} onClick={link?.onClickEvent}>
                        {link.text}
                        {link.description ? <p className={styles.linkDescription}>{link.description}</p> : null}
                      </a>
                    )
                  })}
                </div>
              : null}
              { contentChildrenNodes 
                ? contentChildrenNodes.map((contentChildrenNode: ReactNode, contentChildrenKey: number) => {
                    return <div key={contentChildrenKey}>{contentChildrenNode}</div>;
                })
                : null}
          </div>
        : null}
        { childrenNodes 
          ? childrenNodes.map((childrenNode: ReactNode, childrenKey: number) => {
            return <div key={childrenKey}>{childrenNode}</div>;
          })
          : null}
    </div>
  );
}
